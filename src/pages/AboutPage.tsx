import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div>
      <div>
        Icon made by{" "}
        <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">
          Smashicons
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>

      <Link to="/">
        <h3>Return to main page</h3>
      </Link>
    </div>
  );
};

export default AboutPage;
