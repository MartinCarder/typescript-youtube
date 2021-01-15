import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";
import { createStore, Store, AnyAction, PreloadedState } from "redux";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { rootReducer, AppStoreState } from "store/store";
import theme from "theme/theme";

interface customoptions {
  history?: MemoryHistory<unknown>;
  route?: string[];
  initalState?: PreloadedState<AppStoreState>;
  store?: Store<AppStoreState, AnyAction>;
}

interface WrapperProps {
  children?: React.ReactNode;
}

export const render = (
  ui: React.ReactElement,
  {
    initalState,
    store = createStore(rootReducer, initalState),
    route = ["/"],
    history = createMemoryHistory({ initialEntries: route }),
    ...renderOptions
  }: Omit<RenderOptions, "queries"> & customoptions = {}
) => {
  const dispatchSpy = jest.spyOn(store, "dispatch");
  const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>{children}</Router>
        </ThemeProvider>
      </Provider>
    );
  };
  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    history,
    store,
    dispatchSpy,
  };
};
