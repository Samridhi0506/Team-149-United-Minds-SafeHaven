import React,{useState} from "react";
import "aos/dist/aos.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const storiesData = [
    {
      id: 1,
      title: "The impact of gender data",
      description:
        "14,716 women-headed households were given priority food aid thanks in part to data produced by the Women Count Regional Programme for the Arab States.",
      image: "https://data.unwomen.org/sites/default/files/styles/detailed_page_750x460/public/node/features/Palestine_GazaConflict_18November2023_02.JPG?itok=ssLuNmQa", // Replace with actual image URL
    },
    {
      id: 2,
      title: "Empowering Women Through Education",
      description:
        "Education programs have helped over 50,000 women gain new skills and employment opportunities worldwide.",
      image: "https://lxme.in/wp-content/uploads/2024/04/Role-of-Education-in-Women-Empowerment-12.jpg",
    },
    {
      id: 3,
      title: "Rising from the Ashes: A Survivor’s Journey to Justice",
      description:
        "After years of abuse, found the courage to speak out and seek justice. Her story is a testament to the power of resilience and hope.",
      image: "https://files.idyllic.app/files/static/1944490"
    },
    {
      id: 4,
      title: "Life Fearless and Free: How One Woman Changed the Law",
      description:"After being harassed on the streets, she fought for a law that would protect",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRChejCm3RvtDFwSrjRCX5lMM-KQ49DuJnH__4CJ8mqJ5GBqq9dYTLNIs0lpP53fosyKV0&usqp=CAU" 
    }
  ];

const StoryCard = () => {
    const [search, setSearch] = useState("");

    const filteredStories = storiesData.filter((story) =>
        story.title.toLowerCase().includes(search.toLowerCase())
    );
    return(
        <div id="Story">
          
            <section className="container py-5">                 
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">Stories</h2>
                    <Link to="/add-story">
                      <Button variant="primary">+ Add Story</Button>
                    </Link>
                    <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {filteredStories.map((story) => (
                    <div
                    key={story.id}
                    className="row align-items-center bg-light p-4 mb-4"
                    style={{ borderRadius: "10px" }}
                    >
                    <div className="col-md-6">
                        <img
                        src={story.image}
                        alt={story.title}
                        className="img-fluid"
                        style={{ borderRadius: "5px", width: "500px", height: "300px" }}
                        />
                    </div>
                    <div className="col-md-6">
                        <h4 className="fw-bold">{story.title}</h4>
                        <p>{story.description}</p>
                        <a href="#" to="/stories" className="fw-bold text-dark">
                        READ MORE IMPACT STORIES &gt;
                        </a>
                    </div>
                    </div>
                ))}
            </section>
        </div>
    )
    };
    export default StoryCard;