import Logo from '../../../header-components/Logo';

function CreatePageHeader() {
  return (
    <div
      style={{ backgroundColor: '#7197C3' }}
      className="p-4 flex flex-row justify-between items-center h-16">
      <div className="flex items-center gap-x-6">
        <Logo />
      </div>
    </div>
  );
}

export default CreatePageHeader;
