import CV from "react-cv";
import me from "../assets/me.jpg";
function Me() {
  return (
    <CV
      personalData={{
        name: "Perez Githumbi",
        title: "Software Engineer",
        image: `${me}`,
        contacts: [
          { type: "email", value: "perezmaina@outlook.com" },
          { type: "location", value: "Nairobi, Kenya" },
          { type: "linkedin", value: "linkedin.com/in/pgm-githumbi" },
          //   { type: "twitter", value: "twitter.com/sbayd" },
          { type: "github", value: "github.com/pgm-githumbi" },
        ],
      }}
      sections={[
        {
          type: "text",
          title: "Education",
          content: `I have a computer science degree from Multimedia University of Kenya.
          Graduated with second class upper division`,
          icon: "graduation",
        },
        {
          type: "projects-list",
          title: "Skills",
          icon: "rocket",
          groups: [
            {
              sectionHeader: "Frontend",
              description: "frontend tools used to make this website",
              items: [
                {
                  title: "React 18",
                  //   projectUrl: "optional",
                  //   description: "Optional",
                },
                { title: "React-Router-Dom" },
                { title: "Bootstrap 5" },
                { title: "React query" },
                { title: "React hook form" },
              ],
            },
            {
              sectionHeader: "Backend",
              description: "I made the backend with the following",
              items: [
                {
                  title: "Laravel",
                },
                { title: "MySQL" },
                { title: "Spatie Permissions" },
              ],
            },
            {
              // Schema of single group object
              sectionHeader: "Other Skills I Have",
              items: [
                { title: "Redux" },
                { title: "Next js Frontend (new app router)" },
                { title: "Tailwind CSS" },
                { title: "Docker" },
                { title: "Linux" },
                { title: "Express js" },
              ],
            },
            {
              // Schema of single group object
              sectionHeader: "Currently learning",
              items: [{ title: "Solidity" }],
            },
          ],
          // icon: "usertie",
        },

        {
          type: "projects-list",
          title: "Links",
          icon: "rocket",
          groups: [
            {
              sectionHeader: "Code",
              description: "project code",
              items: [
                {
                  title: "React frontend github",
                  projectUrl: "https://github.com/pgm-githumbi/lib_app_react/",
                },
                {
                  title: "Laravel backend",
                  projectUrl: "https://github.com/pgm-githumbi/lib-app",
                },
              ],
            },
          ],
        },
      ]}
      branding={false} // or false to hide it.
    />
  );
}

export default Me;
