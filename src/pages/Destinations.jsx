import { useEffect, useState } from "react";
import api from "../services/api";
import DestinationCard from "../components/DestinationCard";
import { Link } from "react-router-dom";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");
  const [sort, setSort] = useState("");

  async function getDestinations() {
    try {
      const response = await api.get("/destinations");
      setDestinations(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDestinations();
  }, []);

  async function deleteDestination(id) {
    try {
      await api.delete(`/destinations/${id}`);

      setDestinations(
        destinations.filter(
          (destination) => destination.id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  const filteredDestinations = destinations.filter(
    (destination) => {
      const searchMatch = destination.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch =
        category === "All" ||
        destination.category === category;

      const budgetMatch =
        budget === "All" ||
        destination.budget === budget;

      return (
        searchMatch &&
        categoryMatch &&
        budgetMatch
      );
    }
  );

  let finalDestinations = [...filteredDestinations];

  if (sort === "high") {
    finalDestinations.sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "low") {
    finalDestinations.sort(
      (a, b) => a.rating - b.rating
    );
  }

  return (
    <>
      <h1>Popular Destinations</h1>

      <Link
        to="/add-destination"
        className="add-btn"
      >
        Add Destination
      </Link>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Destination"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Beach">Beach</option>
          <option value="Hill Station">
            Hill Station
          </option>
          <option value="Adventure">
            Adventure
          </option>
        </select>

        <select
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="">
            Select Rating
          </option>

          <option value="high">
            High To Low
          </option>

          <option value="low">
            Low To High
          </option>
        </select>
      </div>

      <div className="destinations">
        {finalDestinations.length > 0 ? (
          finalDestinations.map(
            (destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onDelete={deleteDestination}
              />
            )
          )
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
}

export default Destinations;