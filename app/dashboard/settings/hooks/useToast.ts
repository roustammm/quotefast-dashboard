import { toast, Toaster } from 'react-hot-toast';

// Custom toast hook met Nederlandse berichten en styling
export const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: 'rgba(16, 185, 129, 0.9)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '12px',
        padding: '16px',
      },
      icon: '✓',
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: 'rgba(239, 68, 68, 0.9)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '12px',
        padding: '16px',
      },
      icon: '✕',
    });
  };

  const showLoading = (message: string) => {
    return toast.loading(message, {
      position: 'top-right',
      style: {
        background: 'rgba(59, 130, 246, 0.9)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        padding: '16px',
      },
    });
  };

  const showInfo = (message: string) => {
    toast(message, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: 'rgba(59, 130, 246, 0.9)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        padding: '16px',
      },
      icon: 'ℹ️',
    });
  };

  const dismiss = (toastId: string) => {
    toast.dismiss(toastId);
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  return {
    success: showSuccess,
    error: showError,
    loading: showLoading,
    info: showInfo,
    dismiss,
    dismissAll,
  };
};

// Export Toaster component voor use in layout
export { Toaster };

