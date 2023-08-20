import { useCallback } from "react";
import style from "./ImageDropzone.module.css";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../Redux/UsersSlice";
import axios from "axios";
const { VITE_URL } = import.meta.env;

const ImageDropzone = ({ type, handleCancelButton }) => {
  const [image, setImage] = useState(null);
  const userData = useSelector(selectUserProfile);
  const [editData, setEditData] = useState({});
  const URLData = `${VITE_URL}/user/${userData.id}`;
  const URLImage = `${VITE_URL}/images/profile`;

  const onDrop = useCallback((acceptedFiles) => {
    const selectedImage = acceptedFiles[0]; // Get the first image from the accepted files array
    const imageWithoutPath = new File([selectedImage], selectedImage.name, {
      type: selectedImage.type,
      lastModified: selectedImage.lastModified,
    });
    setImage({
      file: imageWithoutPath,
      preview: URL.createObjectURL(selectedImage),
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImageDeleteButton = () => {
    setImage(null);
  };

  const handleUploadButton = async () => {
    const f = new FormData();
    f.append("image", image.file);
    try {
      await axios.post(URLImage, f, {
        withCredentials: "include",
      });
    } catch (error) {
      console.log(error);
    }
    handleCancelButton();
    window.location.reload();
  };

  const saveChanges = async (event) => {
    event.preventDefault();
    try {
      await axios.put(URLData, editData, {
        withCredentials: "include",
      });
      handleCancelButton();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === "info_skills") {
      setEditData((prevState) => ({
        ...prevState,
        [name]: value.split(", "),
      }));
    }
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={style.mainDiv}>
      <div
        className={style.blackContainer}
        onClick={() => handleCancelButton()}
      ></div>
      {type === "photo" ? (
        <div className={style.whiteContainer}>
          <div className={style.TopContainer}>
            <h2 className={style.Title}>Añadir o editar foto de perfil</h2>
            <button onClick={handleCancelButton}>X</button>
          </div>

          <div className={style.ImageContainer}>
            {image ? (
              <div className={style.previewImageContainer}>
                <div className={style.Background}>
                  <img src={image.preview} className={style.previewImage} />
                  <button
                    className={style.previewImageDeleteButton}
                    onClick={() => handleImageDeleteButton()}
                  >
                    X
                  </button>
                </div>
              </div>
            ) : (
              <div {...getRootProps()} className={style.dropzoneBox}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className={style.dropzoneText}>Suelta tu foto aquí...</p>
                ) : (
                  <p className={style.dropzoneText}>
                    Arrastra y suelta una foto aquí.
                  </p>
                )}
              </div>
            )}
          </div>
          <div className={style.buttonDiv}>
            <button className={style.saveButton} onClick={handleUploadButton}>
              SUBIR
            </button>
            <button className={style.cancelButton} onClick={handleCancelButton}>
              CANCELAR
            </button>
          </div>
        </div>
      ) : (
        <div className={`${style.whiteContainer} ${style.GeneralContainer}`}>
          <div className={style.TopContainer}>
            <h2 className={style.Title}>Editar información de perfil</h2>
            <button onClick={handleCancelButton}>X</button>
          </div>
          <form onSubmit={saveChanges}>
            <div className={`${style.ImageContainer} ${style.InfoContainer}`}>
              <div className={style.Option}>
                <label htmlFor="userName"> Nombre de usuario*</label>
                <input
                  defaultValue={userData.username}
                  name="username"
                  id="userName"
                  type="text"
                  onChange={handleOnChange}
                />
              </div>
              <div className={style.Option}>
                <label htmlFor="Name"> Nombre completo*</label>
                <input
                  defaultValue={userData.name}
                  name="name"
                  id="Name"
                  onChange={handleOnChange}
                  type="text"
                />
              </div>

              <div className={style.Option}>
                <label htmlFor="email"> Correo electrónico*</label>
                <input
                  defaultValue={userData.name}
                  name="email"
                  id="email"
                  onChange={handleOnChange}
                  type="text"
                />
              </div>
              <div className={style.Option}>
                <label htmlFor="skills"> Habilidades*</label>
                <input
                  defaultValue={
                    userData.info_skills
                      ? userData.info_skills.join(", ")
                      : null
                  }
                  name="info_skills"
                  onChange={handleOnChange}
                  id="skills"
                  type="text"
                />
              </div>

              <div className={style.Option}>
                <label htmlFor="country"> País*</label>
                <input
                  defaultValue={userData.profile_country}
                  name="profile_country"
                  onChange={handleOnChange}
                  id="country"
                  type="text"
                />
              </div>

              <div className={style.Option}>
                <label htmlFor="city"> Ciudad*</label>
                <input
                  defaultValue={userData.profile_city}
                  name="profile_city"
                  onChange={handleOnChange}
                  id="city"
                  type="text"
                />
              </div>

              <div className={style.Option}>
                <label htmlFor="biography">Biografía</label>
                <textarea
                  className={style.BioInput}
                  defaultValue={userData.profile_bio}
                  name="profile_bio"
                  onChange={handleOnChange}
                  id="biography"
                  type="text"
                />
              </div>

              <h4 className={style.SubTitle}>Estudios</h4>
              <div className={style.Option}>
                <label htmlFor="formation">Formación</label>
                <input
                  defaultValue={userData.academic_formation}
                  name="academic_formation"
                  id="formation"
                  type="text"
                />
              </div>

              <div className={style.Option}>
                <label htmlFor="institution">Institución</label>
                <input
                  defaultValue={userData.academic_institution}
                  name="academic_institution"
                  onChange={handleOnChange}
                  id="institution"
                  type="text"
                />
              </div>

              <div className={style.Option}>
                <label htmlFor="level">Nivel académico</label>
                <input
                  defaultValue={userData.academic_level}
                  name="academic_level"
                  onChange={handleOnChange}
                  id="level"
                  type="text"
                />
              </div>

              <div className={style.Option}>
                <label htmlFor="graduation">Año de graduación</label>
                <input
                  defaultValue={userData.academic_institution}
                  name="academic_institution"
                  onChange={handleOnChange}
                  id="graduation"
                  type="text"
                />
              </div>
            </div>
            <div className={style.buttonDiv}>
              <button className={style.saveButton} type="submit">
                SUBIR
              </button>
              <button
                className={style.cancelButton}
                onClick={handleCancelButton}
              >
                CANCELAR
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
