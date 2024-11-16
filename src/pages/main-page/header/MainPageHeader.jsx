import LogoNoLink from '../../../header-components/LogoNoLink';
import Search from '../../../header-components/Search';
import Create from '../../../header-components/Create';

function MainPageHeader() {
  return (
    <div
      style={{ backgroundColor: '#7197C3' }}
      className="p-4 flex flex-row justify-between items-center h-16">
      <div className="flex items-center gap-x-6">
        <LogoNoLink />
        <Search />
        <Create />
      </div>
    </div>
  );
}

export default MainPageHeader;
