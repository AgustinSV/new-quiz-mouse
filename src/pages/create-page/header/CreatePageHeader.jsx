import Logo from "../../../header-components/Logo";

function CreatePageHeader() {
  return (
    <div className="bg-blue-500 p-4 flex flex-row justify-between items-center h-16">
      <div className="flex items-center gap-x-6">
        <Logo />
      </div>
    </div>
  );
}

export default CreatePageHeader;
