import { HiChat, HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectDarkMode } from "../../Redux/UsersSlice";
import style from "./FeedCard.module.css";

const FeedCard = ({ user }) => {
  const navigate = useNavigate();
  const darkMode = useSelector(selectDarkMode);
  const lightColor = "#232323";
  const darkColor = "#FFF";

  const handleProfile = () => {
    navigate(`/user/profile/${user.user.id}`);
  };
  const handleChats = () => {
    navigate("/chat");
  };
  return (
    <div className={style.Card}>
      <div className={style.MainContainer}>
        <div className={style.ConfigContainer}>
          <div onClick={handleProfile} className={style.ConfigContainer}>
            <div className={style.PhotoContainer}>
              <img src={user.user.profile_image} alt="" />
            </div>

            <div className={style.AttributesContainer}>
              <h1>{user.user.name}</h1>
              <h2>{user.user.academic_area}</h2>

              <h2>{user.user.info_skills}</h2>

              <h2>{user.user.info_skills?.join(", ")}</h2>

              {user.user.profile_city || user.user.profile_country ? (
                <h3>
                  {`${user.user.profile_city} - ${user.user.profile_country}`}{" "}
                </h3>
              ) : null}
            </div>
          </div>
          <div className={style.IconsContainer}>
            <button onClick={handleChats}>
              <HiChat
                size={"2.6rem"}
                color={darkMode ? darkColor : lightColor}
              />
            </button>
            <button onClick={handleProfile}>
              <HiUser
                size={"2.6rem"}
                color={darkMode ? darkColor : lightColor}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
