import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom"; // Portal ke liye
import { MoreVertical, Search } from "lucide-react";

const ActionMenu = ({
  items = [],
  position = "bottom-right",
  icon = <MoreVertical className="w-4 h-4" />,
  buttonClassName = "",
  menuClassName = "",
  showStatus = false,
  statusInfo = null,
  onOpen = () => {},
  onClose = () => {},
  disabled = false,
  enableSearch = false, // Naya feature
  usePortal = false,    // Taki overflow ki tension na ho
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // 1. Filter Logic
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sectionTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const openMenu = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    onOpen();
  }, [disabled, onOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setSearchTerm("");
    onClose();
    buttonRef.current?.focus();
  }, [onClose]);

  const toggleMenu = () => (isOpen ? closeMenu() : openMenu());

  // 2. Click Outside & ESC logic
  useEffect(() => {
    if (!isOpen) return;
    const handleEvents = (e) => {
      if (e.key === "Escape") closeMenu();
      if (menuRef.current && !menuRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleEvents);
    document.addEventListener("keydown", handleEvents);
    return () => {
      document.removeEventListener("mousedown", handleEvents);
      document.removeEventListener("keydown", handleEvents);
    };
  }, [isOpen, closeMenu]);

  // Position Styles
  const positionClass = {
    "bottom-right": "right-0 mt-1 origin-top-right",
    "bottom-left": "left-0 mt-1 origin-top-left",
    "top-right": "right-0 bottom-full mb-1 origin-bottom-right",
    "top-left": "left-0 bottom-full mb-1 origin-bottom-left",
  }[position];

  const handleItemClick = (item) => {
    if (item.disabled || item.isStatic) return;
    item.onClick?.();
    if (!item.keepOpen) closeMenu();
  };

  // Menu Content Component (Reusable for Portal)
  const MenuContent = (
    <div
      ref={menuRef}
      role="menu"
      className={`absolute ${positionClass} w-60 bg-white border border-gray-200 rounded-xl shadow-2xl z-[999] overflow-hidden animate-in fade-in zoom-in duration-150 ${menuClassName}`}
    >
      {/* STATUS SECTION */}
      {showStatus && statusInfo && (
        <div className="px-4 py-3 border-b bg-gray-50/50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] uppercase tracking-wider font-bold text-gray-500">
              {statusInfo.title}
            </span>
            {statusInfo.status && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                statusInfo.status === "active" ? "bg-green-100 text-green-700" :
                statusInfo.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                statusInfo.status === "rejected" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
              }`}>
                {statusInfo.statusText || statusInfo.status}
              </span>
            )}
          </div>
          {statusInfo.subtitle && <p className="text-xs text-gray-400 truncate">{statusInfo.subtitle}</p>}
        </div>
      )}

      {/* SEARCH BAR */}
      {enableSearch && (
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 w-3.5 h-3.5 text-gray-400" />
            <input
              autoFocus
              className="w-full pl-7 pr-3 py-1.5 text-sm bg-gray-100 border-transparent rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Search actions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* MENU ITEMS */}
      <div className="py-1 max-h-80 overflow-y-auto scrollbar-thin">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            if (item.divider) return <div key={index} className="my-1 border-t border-gray-100" />;
            
            if (item.sectionTitle) return (
              <div key={index} className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {item.sectionTitle}
              </div>
            );

            return (
              <button
                key={index}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => handleItemClick(item)}
                className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-all
                  ${item.danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-blue-50"}
                  ${item.active ? "bg-blue-50 text-blue-700 font-medium" : ""}
                  disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {item.icon && <span className={`${item.danger ? "text-red-500" : "text-gray-400"}`}>{item.icon}</span>}
                <span className="flex-1 text-left">{item.label}</span>
                {item.shortcut && <span className="text-[10px] text-gray-400 border border-gray-200 px-1 rounded bg-gray-50">{item.shortcut}</span>}
                {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-${item.badgeColor || 'gray'}-100 text-${item.badgeColor || 'gray'}-700`}>
                        {item.badge}
                    </span>
                )}
              </button>
            );
          })
        ) : (
          <div className="px-4 py-6 text-center text-sm text-gray-400">No results found</div>
        )}
      </div>

      {/* FOOTER */}
      {items.some(i => i.footer) && (
        <div className="px-4 py-2 border-t bg-gray-50/80 text-[11px] text-gray-500 italic">
          {items.find(i => i.footer)?.footer}
        </div>
      )}
    </div>
  );

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={`p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 ${buttonClassName}`}
      >
        {icon}
      </button>

      {isOpen && (usePortal ? createPortal(MenuContent, document.body) : MenuContent)}
    </div>
  );
};

export default ActionMenu;