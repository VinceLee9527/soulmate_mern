import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const userId = cookies.UserId;

  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    firstName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "male",
    instrumentPlayed: "singer",
    instrumentInterest: "singer",
    url: "",
    about: "",
    matches: [],
  });

  let navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await api.get("/user", {
        params: { userId },
      });
      setFormData(() => ({
        user_id: cookies.UserId,
        firstName: response.data.firstName ? response.data.firstName : "",
        dobDay: response.data.dobDay ? response.data.dobDay : "",
        dobMonth: response.data.dobMonth ? response.data.dobMonth : "",
        dobYear: response.data.dobYear ? response.data.dobYear : "",
        gender: response.data.gender ? response.data.gender : "male",
        instrumentPlayed: response.data.instrumentPlayed
          ? response.data.instrumentPlayed
          : "singer",
        instrumentInterest: response.data.instrumentInterest
          ? response.data.instrumentInterest
          : "singer",
        url: response.data.url ? response.data.url : "",
        about: response.data.about ? response.data.about : "",
        matches: response.data.matches ? response.data.matches : [],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/user", {
        formData,
      });
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImgSelect = async (e) => {
    const img = e.target.files[0];

    if (img.size > 348576) {
      alert("File is too big!");
      e.target.value = "";
      return;
    }
    const b64 = await convertB64(img);

    setFormData((prevState) => ({
      ...prevState,
      url: b64,
    }));
  };

  const convertB64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handleImgUpload = (e) => {
    console.log(e.target.files[0]);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="profile">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="First Name"
              required={true}
              value={formData.firstName}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dobDay"
                type="number"
                name="dobDay"
                placeholder="DD"
                required={true}
                value={formData.dobDay}
                onChange={handleChange}
                min="1"
                max="31"
              />

              <input
                id="dobMonth"
                type="number"
                name="dobMonth"
                placeholder="MM"
                required={true}
                value={formData.dobMonth}
                onChange={handleChange}
                min="1"
                max="12"
              />

              <input
                id="dobYear"
                type="number"
                name="dobYear"
                placeholder="YYYY"
                required={true}
                value={formData.dobYear}
                onChange={handleChange}
                min="1900"
                max="2030"
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="genderMale"
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
                checked={formData.gender === "male"}
              />
              <label htmlFor="genderMale">Male</label>
              <input
                id="genderFemale"
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
                checked={formData.gender === "female"}
              />
              <label htmlFor="genderFemale">Female</label>
              <input
                id="genderOther"
                type="radio"
                name="gender"
                value="other"
                onChange={handleChange}
                checked={formData.gender === "other"}
              />
              <label htmlFor="genderOther">Other</label>
            </div>

            <label>I am a</label>
            <div className="multiple-input-container">
              <input
                id="singer"
                type="radio"
                name="instrumentPlayed"
                value="singer"
                onChange={handleChange}
                checked={formData.instrumentPlayed === "singer"}
              />
              <label htmlFor="singer">Singer</label>
              <input
                id="guitarist"
                type="radio"
                name="instrumentPlayed"
                value="guitarist"
                onChange={handleChange}
                checked={formData.instrumentPlayed === "guitarist"}
              />
              <label htmlFor="guitarist">Guitarist</label>
              <input
                id="bassist"
                type="radio"
                name="instrumentPlayed"
                value="bassist"
                onChange={handleChange}
                checked={formData.instrumentPlayed === "bassist"}
              />
              <label htmlFor="bassist">Bassist</label>
              <input
                id="drummer"
                type="radio"
                name="instrumentPlayed"
                value="drummer"
                onChange={handleChange}
                checked={formData.instrumentPlayed === "drummer"}
              />
              <label htmlFor="drummer">Drummer</label>
            </div>

            <label>Show Me</label>

            <div className="multiple-input-container">
              <input
                id="singerInterest"
                type="radio"
                name="instrumentInterest"
                value="singer"
                onChange={handleChange}
                checked={formData.instrumentInterest === "singer"}
              />
              <label htmlFor="singerInterest">Singers</label>
              <input
                id="guitarInterest"
                type="radio"
                name="instrumentInterest"
                value="guitarist"
                onChange={handleChange}
                checked={formData.instrumentInterest === "guitarist"}
              />
              <label htmlFor="guitarInterest">Guitarists</label>
              <input
                id="bassInterest"
                type="radio"
                name="instrumentInterest"
                value="bassist"
                onChange={handleChange}
                checked={formData.instrumentInterest === "bassist"}
              />
              <label htmlFor="bassInterest">Bassists</label>
              <input
                id="drummerInterest"
                type="radio"
                name="instrumentInterest"
                value="drummer"
                onChange={handleChange}
                checked={formData.instrumentInterest === "drummer"}
              />
              <label htmlFor="drummerInterest">Drummers</label>
              <input
                id="everyoneInterest"
                type="radio"
                name="instrumentInterest"
                value="everyone"
                onChange={handleChange}
                checked={formData.instrumentInterest === "everyone"}
              />
              <label htmlFor="everyoneInterest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like funk/soul/blues..."
              value={formData.about}
              onChange={handleChange}
            />

            <input type="submit" value="Submit" />
          </section>

          <section>
            <label htmlFor="url">Profile Photo</label>
            <input type="file" name="url" id="url" onChange={handleImgSelect} />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Profile;
