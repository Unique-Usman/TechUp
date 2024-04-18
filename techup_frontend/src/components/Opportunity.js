import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getOpportunies = async () => {
      try {
        const response = await axiosPrivate.get("/opportunities", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setOpportunities(response.data.results);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getOpportunies();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Opportunities List</h2>
      {opportunities?.length ? (
        <ul>
          {opportunities.map((opportunities, i) => (
            <li key={i}>{opportunities?.name}</li>
          ))}
        </ul>
      ) : (
        <p>No Opportunities to display</p>
      )}
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </article>
  );
};

export default Opportunities;
