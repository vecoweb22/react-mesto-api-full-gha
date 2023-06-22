import Header from "./Header";
import useValidation from "../utils/useValidation";

function Login(props) {
  const { values, errors, handleChange, defaultValues } = useValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    props.onLogin(values.password, values.email, defaultValues);
  };

  return (
    <main>
      <Header link="/signup" linkName="Регистрация" />
      <div className="authorization">
        <h2 className="popup__title popup__title_color_white">Вход</h2>
        <form
          name="login"
          className="form_place_authorization popup__input-container"
          noValidate=""
          onSubmit={handleSubmit}
        >
          <input
            id="email"
            type="email"
            name="email"
            className="popup__text popup__text_color_grey email"
            placeholder="Email"
            required=""
            minLength={2}
            maxLength={40}
            value={values.email || ""}
            onChange={handleChange}
          />
          <span className="popup__login-error error">{errors.email || ""}</span>
          <input
            id="password"
            type="password"
            name="password"
            className="popup__text popup__text_color_grey password"
            placeholder="Пароль"
            required=""
            minLength={2}
            value={values.password || ""}
            onChange={handleChange}
          />
          <span className="popup__password-error error">{errors.password || ""}</span>
          <button
            className="popup__submit-btn popup__submit-btn_color_white"
            type="submit"
            aria-label="Войти"
          >
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
