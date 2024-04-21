import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LINK_REGEX = /^(https|ftp):\/\/[^\s/$.?#].[^\s]*$/;

const CreateOpportunities = () => {
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const titleRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [link, setLink] = useState("");
  const [validLink, setValidLink] = useState(false);
  const [opportunityType, setOpportunityType] = useState("all");

  const [linkFocus, setLinkFocus] = useState(false);
  const [deadlineFocus, setDeadlineFocus] = useState("");

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    setValidLink(LINK_REGEX.test(link));
  }, [link]);

  const handleDeadlineChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      setDeadline("");
    } else {
      setDeadline(event.target.value);
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [title, description, deadline, link, opportunityType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/opportunities",
        JSON.stringify({
          title,
          description,
          deadline: new Date(deadline).toISOString(),
          link,
          opportunity_type: opportunityType,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setTitle("");
      setDescription("");
      setDeadline("");
      setLink("");
      setOpportunityType("all");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.data?.message);
      } else {
        setErrMsg("Create Opportunity Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Create an Opportunity</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          ref={titleRef}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="link">
          Link:
          <FontAwesomeIcon
            icon={faCheck}
            className={validLink ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validLink || !link ? "hide" : "invalid"}
          />
        </label>
        <input
          type="text"
          id="link"
          onChange={(e) => setLink(e.target.value)}
          value={link}
          required
          onFocus={() => setLinkFocus(true)}
          onBlur={() => setLinkFocus(false)}
        />
        <p
          id="uidnote"
          className={
            linkFocus && link && !validLink ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must be a valid URL. Begins with ftp:// or https://
        </p>
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="datetime-local"
          id="deadline"
          name="deadline"
          value={deadline}
          onChange={handleDeadlineChange}
          onFocus={() => setDeadlineFocus(true)}
          onBlur={() => setDeadlineFocus(false)}
        />
        <p
          id="uidnote"
          className={deadlineFocus && !deadline ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          The date and time the opportunity closes. Must be in the future.
        </p>

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="opportunityType">Opportunity Type:</label>
        <select
          id="opportunityType"
          name="opportunityType"
          value={opportunityType}
          onChange={(e) => setOpportunityType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="datascience">Data Science</option>
          <option value="softwareengineering">Software Engineering</option>
          <option value="webdevelopment">Web Development</option>
          <option value="machinelearning">Machine Learning</option>
          <option value="devops">DevOps</option>
        </select>
        <button>Create Opportunities</button>
      </form>
    </section>
  );
};

export default CreateOpportunities;
