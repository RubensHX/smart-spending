const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-200 dark:from-gray-900 dark:to-black">
      {children}
    </div>
  );
};

export default AuthLayout;
