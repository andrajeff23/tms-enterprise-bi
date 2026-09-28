const fs = require('fs');

const files = [
  'src/features/system/pages/system.page.tsx',
  'src/features/operational/pages/unit-rusak.page.tsx',
  'src/features/operational/pages/uang-jalan.page.tsx',
  'src/features/operational/pages/pod.page.tsx',
  'src/features/operational/pages/planner-assignment.page.tsx',
  'src/features/operational/pages/order-management.page.tsx',
  'src/features/operational/pages/maintenance.page.tsx',
  'src/features/operational/pages/fleet-management.page.tsx',
  'src/features/operational/pages/delivery-order.page.tsx',
  'src/features/masterData/pages/vehicle.page.tsx',
  'src/features/masterData/pages/master-data.page.tsx',
  'src/features/finance/pages/penagihan.page.tsx',
  'src/features/finance/pages/payment.page.tsx',
  'src/features/finance/pages/finance.page.tsx',
  'src/features/dashboard/pages/analytics.page.tsx'
];

const stateCode = `
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const renderPagination = (dataLength: number) => {
    const totalPages = Math.ceil(dataLength / itemsPerPage);
    return (
      <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="text-xs text-slate-500 font-medium">
          Menampilkan <span className="font-bold text-slate-800">{dataLength === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-bold text-slate-800">{Math.min(currentPage * itemsPerPage, dataLength)}</span> dari <span className="font-bold text-slate-800">{dataLength}</span> data
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-1 px-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 2 + i;
                if (pageNum > totalPages) pageNum = totalPages - (4 - i);
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={\`w-7 h-7 rounded-md text-xs font-bold transition-colors \${
                    currentPage === pageNum 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-600 hover:bg-slate-200'
                  }\`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };
`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // Skip if already done
  if (content.includes('renderPagination')) {
    console.log(f + ': Already processed');
    return;
  }

  // 1. Add lucide-react imports if missing
  if (!content.includes('ChevronLeft')) {
    content = content.replace(/import \{([^}]+)\} from 'lucide-react';/, (match, p1) => {
      return 'import {' + p1 + ', ChevronLeft, ChevronRight } from \'lucide-react\';';
    });
  }

  // 2. Add state and renderPagination
  // Find first useState
  content = content.replace(/(const \[.*?\] = useState.*?;)/, "$1\n" + stateCode);
  
  // 3. Reset pagination on tab change if setActiveTab is present
  content = content.replace(/setActiveTab\([^)]+\)/g, (match) => {
    return match + '; setCurrentPage(1)';
  });
  
  // 4. Replace mapping and add pagination component
  // Using a replacer callback to match any array mapped inside a table
  content = content.replace(/(<div className="overflow-x-auto">[\s\S]*?<tbody[^>]*>[\s\S]*?)\{([a-zA-Z0-9_]+)\.map\(([\s\S]*?<\/table>\s*<\/div>)/g, (match, before, arrayName, after) => {
    let slicedMap = '{' + arrayName + '.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(';
    let paginatedHtml = before + slicedMap + after + '\n        {renderPagination(' + arrayName + '.length)}';
    return paginatedHtml;
  });

  fs.writeFileSync(f, content);
  console.log(f + ': Processed');
});
