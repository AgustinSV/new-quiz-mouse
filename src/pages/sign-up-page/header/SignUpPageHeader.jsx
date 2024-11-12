import LogoToLandingPage from "../../../header-components/LogoToLandingPage";

function SignUpPageHeader() {
  return (
    <div className="bg-blue-500 p-4 flex flex-row justify-between items-center h-16">
      <div className="flex items-center gap-x-6">
        <LogoToLandingPage />
      </div>
    </div>
  );
}

export default SignUpPageHeader;
