import Search from '../../../header-components/Search';
import LogIn from '../../../header-components/LogIn';
import SignUp from '../../../header-components/SignUp';
import LogoNoLink from '../../../header-components/LogoNoLink';
import CreatetoLogIn from '../../../header-components/CreateToLogIn';

function LandingPageHeader() {
  return (
    <div
      style={{ backgroundColor: '#7197C3' }}
      className="p-4 flex flex-row justify-between items-center h-16">
      <div className="flex items-center gap-x-6">
        <LogoNoLink />
        <Search />
        <CreatetoLogIn />
      </div>
      <div className="flex items-center gap-x-7">
        <LogIn />
        <SignUp />
      </div>
    </div>
  );
}

export default LandingPageHeader;
