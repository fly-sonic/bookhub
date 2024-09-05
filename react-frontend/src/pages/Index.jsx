import React from "react";
import girl_reading from "../../public/girl-reading_1280.png";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const IndexCard = ({ title, paragraph, btnText, linkUrl }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl md:text-3xl font-semibold mb-5">{title}</h2>
      <p className="text-base mb-5">{paragraph}</p>
      <div className="grow"></div>
      <Link to={linkUrl}>
        <Button btnText={btnText} />
      </Link>
    </div>
  );
};

const Index = () => {
  return (
    <>
      <section className="bg-amber-50">
        <div
          style={{ minHeight: "10rem" }}
          className="container py-11 flex flex-col md:flex-row justify-center md:justify-between items-stretch lg:items-center"
        >
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
              Welcome to BookHub
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-5">
              Having difficulty deciding what to read next? You're in the right
              place.{" "}
            </p>
          </div>

          <div>
            <img
              className="w-full max-w-80 mx-auto"
              src={girl_reading}
              alt="A girl reading a book"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container py-20 flex flex-col lg:flex-row gap-9">
          <IndexCard
            title="For Readers"
            paragraph="Dive into our expansive database of books and discover a world of literary treasures waiting to be explored."
            btnText="Find a Book"
            linkUrl="/books"
          />
          <IndexCard
            title="For Authors"
            paragraph="Add your book to our database of books and increase your book's visibility in a highly competitive market."
            btnText="Add a Book"
            linkUrl="/create-book"
          />
        </div>
      </section>
    </>
  );
};

export default Index;
