
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 px-6 text-center text-sm text-slate-500 dark:text-slate-400">
      <p>© {new Date().getFullYear()} Temple Dashboard. 모든 권리 보유.</p>
    </footer>
  );
};

export default Footer;
