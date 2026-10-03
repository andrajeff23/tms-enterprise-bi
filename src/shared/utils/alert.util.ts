import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

export const showSuccessAlert = (title: string, text?: string): Promise<SweetAlertResult> => {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    timer: 1500,
    showConfirmButton: false,
  });
};

export const showErrorAlert = (title: string, text?: string): Promise<SweetAlertResult> => {
  return Swal.fire({
    icon: 'error',
    title,
    text,
  });
};

export const showInfoAlert = (title: string, text?: string): Promise<SweetAlertResult> => {
  return Swal.fire({
    icon: 'info',
    title,
    text,
  });
};

export const showConfirmAlert = (
  title: string,
  text: string,
  confirmText: string = 'Ya',
  cancelText: string = 'Batal'
): Promise<SweetAlertResult> => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
};

export const showCustomAlert = (options: SweetAlertOptions): Promise<SweetAlertResult> => {
  return Swal.fire(options);
};
