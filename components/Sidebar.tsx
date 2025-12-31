import React, { useState } from 'react';
import { 
  Home, 
  Clock, 
  LayoutDashboard, 
  FileText, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  FolderClosed, 
  Target
} from 'lucide-react';

const Sidebar = () => {
  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    dashboard: true,
    reports: true,
    myReports: true
  });

  // State for active menu item
  const [activeId, setActiveId] = useState('new-report');

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleItemClick = (id: string) => {
    setActiveId(id);
  };

  return (
    <div className="flex h-screen bg-white shadow-xl z-20 flex-shrink-0 transition-all duration-300">
      {/* Icon Rail */}
      <div className="w-16 flex flex-col items-center py-6 border-r border-gray-100 bg-white">
        <div className="mb-8 p-2 rounded-xl bg-slate-900 text-white font-bold text-xl cursor-pointer flex items-center justify-center w-10 h-10 hover:bg-slate-800 transition-colors">
          C
        </div>
        
        <div className="flex flex-col gap-6 items-center w-full">
          <NavItem icon={<Home size={20} />} />
          <NavItem icon={<Clock size={20} />} />
          <NavItem icon={<LayoutDashboard size={20} />} active />
          <NavItem icon={<FileText size={20} />} />
          <NavItem icon={<Target size={20} />} />
        </div>

        <div className="mt-auto flex flex-col gap-6 items-center w-full pb-4">
          <NavItem icon={<Settings size={20} />} />
        </div>
      </div>

      {/* Text Panel */}
      <div className="w-64 flex flex-col py-6 px-4 bg-gray-50/50">
        <div className="flex items-center justify-between mb-8 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors group">
          <span className="font-semibold text-slate-800 group-hover:text-slate-900">Codename.com</span>
          <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600" />
        </div>

        <div className="space-y-6 overflow-y-auto custom-scrollbar flex-1">
          {/* Dashboard Section */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-2 mb-2">Dashboard</div>
            <MenuItem 
              label="Sales list" 
              id="sales-list" 
              activeId={activeId} 
              onClick={handleItemClick} 
            />
            <MenuItem 
              label="Goals" 
              id="goals" 
              activeId={activeId} 
              onClick={handleItemClick} 
            />
            
            <div className="mt-4">
              <div 
                className="flex items-center justify-between px-2 py-2 text-sm font-medium text-slate-700 bg-white rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection('dashboard')}
              >
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-rose-500 rounded-full"></div>
                  Dashboard
                </div>
                {expandedSections.dashboard ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              
              {expandedSections.dashboard && (
                <div className="pl-6 mt-1 space-y-1 border-l-2 border-gray-100 ml-4 animate-in slide-in-from-top-1 duration-200">
                  <SubMenuItem label="Codename" id="codename" activeId={activeId} onClick={handleItemClick} />
                  <SubMenuItem label="Shared with me" id="shared" activeId={activeId} onClick={handleItemClick} />
                  <SubMenuItem label="Cargo2go" id="cargo" activeId={activeId} onClick={handleItemClick} />
                  <SubMenuItem label="Cloud3r" id="cloud3r" badge="2" activeId={activeId} onClick={handleItemClick} />
                  <SubMenuItem label="Idioma" id="idioma" activeId={activeId} onClick={handleItemClick} />
                  <SubMenuItem label="Syllables" id="syllables" activeId={activeId} onClick={handleItemClick} />
                  <SubMenuItem label="x-0b" id="x0b" activeId={activeId} onClick={handleItemClick} />
                </div>
              )}
            </div>
          </div>

          {/* Reports Section */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-2 mb-2">Reports</div>
            <div className="pl-2 space-y-1">
              <MenuItem 
                label="Share with me" 
                id="share-reports" 
                activeId={activeId} 
                onClick={handleItemClick} 
              />
              
              <div className="flex flex-col">
                 <div 
                   className={`group flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer text-sm text-gray-600 hover:bg-gray-100 transition-colors font-medium text-slate-900`}
                   onClick={() => toggleSection('myReports')}
                 >
                   <span className="flex items-center gap-2">My reports</span>
                   {expandedSections.myReports ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                 </div>
                 
                 {expandedSections.myReports && (
                   <div className="pl-4 mt-1 space-y-1 border-l border-gray-200 ml-1 animate-in slide-in-from-top-1 duration-200">
                      <SubMenuItem label="Emails received" id="emails" activeId={activeId} onClick={handleItemClick} />
                      <SubMenuItem label="Deal duration" id="deal-duration" activeId={activeId} onClick={handleItemClick} />
                      <SubMenuItem label="New report" id="new-report" activeId={activeId} onClick={handleItemClick} />
                      <SubMenuItem label="Analytics" id="analytics" badge="7" activeId={activeId} onClick={handleItemClick} />
                   </div>
                 )}
              </div>
            </div>
          </div>
          
           <div className="pt-4 mt-4 border-t border-gray-200">
             <div className="flex items-center gap-2 text-gray-500 px-2 hover:text-gray-700 cursor-pointer group transition-colors">
                <FolderClosed size={16} className="group-hover:text-rose-500 transition-colors" />
                <span className="text-sm font-medium">Manage folders</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, active }: { icon: React.ReactNode; active?: boolean }) => (
  <div className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${active ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600 hover:scale-105 active:scale-95'}`}>
    {icon}
  </div>
);

interface MenuItemProps {
  label: string;
  id: string;
  activeId: string;
  onClick: (id: string) => void;
  badge?: string;
  children?: React.ReactNode;
}

const MenuItem = ({ label, id, activeId, onClick, badge, children }: MenuItemProps) => (
  <div className="flex flex-col">
    <div 
      className={`group flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-colors ${activeId === id ? 'bg-white text-rose-500 font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
      onClick={() => onClick(id)}
    >
      <span className="flex items-center gap-2">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {badge && <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{badge}</span>}
      </div>
    </div>
    {children && <div className="mt-1">{children}</div>}
  </div>
);

interface SubMenuItemProps {
  label: string;
  id: string;
  activeId: string;
  onClick: (id: string) => void;
  badge?: string;
}

const SubMenuItem = ({ label, id, activeId, onClick, badge }: SubMenuItemProps) => {
  const isActive = activeId === id;
  // Special handling for the visual red dot which in the screenshot is only for Cloud3r
  const showDot = id === 'cloud3r';

  return (
    <div 
      className={`flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer text-sm transition-colors ${isActive ? 'text-rose-500 font-medium bg-white/50' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'}`}
      onClick={() => onClick(id)}
    >
      <span>{label}</span>
      <div className="flex items-center gap-2">
        {badge && <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{badge}</span>}
        {showDot && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>}
      </div>
    </div>
  );
};

export default Sidebar;