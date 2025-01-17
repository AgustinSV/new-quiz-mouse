import Logo from '../../../header-components/Logo';
import Search from '../../../header-components/Search';
import Create from '../../../header-components/Create';

function FlashcardPageHeader() {
  return (
    <div
      style={{ backgroundColor: '#7197C3' }}
      className="p-4 flex flex-row justify-between items-center h-16">
      <div className="flex items-center gap-x-6">
        <Logo />
        <Search />
        <Create />
      </div>
    </div>
  );
}

export default FlashcardPageHeader;
