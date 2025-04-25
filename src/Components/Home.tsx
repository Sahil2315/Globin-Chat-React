import { MouseEvent } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const Home = () => {
  const showTab = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast("Backend Server is currently Under Testing", {
      description: "Please give us some time and, meanwhile, Try the UI.",
    });
  };
  return (
    <div className="flex pt-16 flex-col w-full">
      <div className="w-full fixed top-0 left-0 py-2 px-4 bg-indigo-900 z-20">
        <span className="text-3xl">Globin Chat</span>
      </div>
      <div className="relative">
        <div className="absolute flex flex-row text-xl text-cyan-500 right-16 top-0">
          <Link
            className="py-1 px-2 rounded-md hover:bg-indigo-400/30"
            to="/try"
          >
            Try the UI
          </Link>
          <Link
            onClick={(e) => showTab(e)}
            className="ml-16 py-1 px-2 rounded-md hover:bg-indigo-400/30 opacity-70"
            to="/login"
          >
            Login
          </Link>
          <Link
            onClick={(e) => showTab(e)}
            className="ml-16 py-1 px-2 rounded-md hover:bg-indigo-400/30 opacity-70"
            to="/signup"
          >
            Signup
          </Link>
        </div>
        <div className="mt-12 text-xl mx-12 flex flex-col">
          <span className="text-4xl my-8">Welcome to Globin Chat!</span>
          <p className="mt-6">
            It is a Chatting Application that allow users to send text messages,
            voice calls and video calls to communicate with each other in
            real-time.
          </p>
          <p className="mt-6">
            This Chat Application is built using React, TypeScript, and Tailwind
            CSS as the Core Frontend and ExpressJS, NodeJS, PostgreSQL and
            Socket.io as the Core Backend.
          </p>
          <p className="mt-6">
            It was Created as a Part of my College Project and later on I
            implemented it using more advanced technologies and with more
            features.
          </p>
          <p className="mt-6">
            You can Start using the Chat as a Trial of the User Interface or
            directly by Signing Up and Signing in.
          </p>
          <p className="mt-6">
            My Github Profile :{" "}
            <a
              href="https://github.com/Sahil2315"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 rounded py-1 px-4 hover:bg-indigo-400/25"
            >
              Click here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
