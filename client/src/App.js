import { AppContainer } from "./components/AppContainer";
import { GlobalStyle } from "./GlobalStyles";
import Search from "./views/Search";

function App() {
  return (
    <AppContainer>
    <GlobalStyle />
    <Search />
    </AppContainer>
  );
}

export default App;
