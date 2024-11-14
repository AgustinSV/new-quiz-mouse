import './CreatePageBody.css';
function CreatePageBody() {
  return (
    <div className="container">
      <form>
        <label className="title-label" htmlFor="title">
          Title:
        </label>
        <input type="text" id="title" placeholder="title" />
        <div className="qa-pair">
          <input type="text" placeholder="question" />
          <input type="text" placeholder="answer" />
        </div>
      </form>
    </div>
  );
}

export default CreatePageBody;
