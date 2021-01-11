import React from "react";
import { LoadingIndicator } from "./loadingIndicator";
import { render } from "testHelps";
import { ApiStatus } from "shared/types/api.d";

describe("LoadingIndicator", () => {
  const errorMessage = "Oh no an error";
  const Children = () => <div data-testid="test-children"></div>;
  it("displays loading and no other status when set to loading", () => {
    const wrapper = render(
      <LoadingIndicator status={ApiStatus.STATUS_LOADING}>
        <Children />
      </LoadingIndicator>
    );

    expect(wrapper.getByTestId("loading-indicator")).toBeInTheDocument();

    expect(wrapper.queryByTestId("error-message")).not.toBeInTheDocument();

    expect(wrapper.queryByTestId("test-children")).not.toBeInTheDocument();
  });

  it("displays loading and no other status when set to init", () => {
    const wrapper = render(
      <LoadingIndicator status={ApiStatus.STATUS_INIT}>
        <Children />
      </LoadingIndicator>
    );

    expect(wrapper.getByTestId("loading-indicator")).toBeInTheDocument();

    expect(wrapper.queryByTestId("error-message")).not.toBeInTheDocument();

    expect(wrapper.queryByTestId("test-children")).not.toBeInTheDocument();
  });

  it("displays loaded and no other status when set to loaded", () => {
    const wrapper = render(
      <LoadingIndicator status={ApiStatus.STATUS_LOADED}>
        <Children />
      </LoadingIndicator>
    );

    expect(wrapper.getByTestId("test-children")).toBeInTheDocument();

    expect(wrapper.queryByTestId("error-message")).not.toBeInTheDocument();

    expect(wrapper.queryByTestId("loading-indicator")).not.toBeInTheDocument();
  });

  it("displays error and no other status when set to error", () => {
    const wrapper = render(
      <LoadingIndicator
        status={ApiStatus.STATUS_ERROR}
        errorMessage={errorMessage}
      >
        <Children />
      </LoadingIndicator>
    );

    expect(wrapper.getByTestId("error-message")).toBeInTheDocument();
    expect(wrapper.getByTestId("error-message")).toHaveTextContent(
      errorMessage
    );

    expect(wrapper.queryByTestId("test-children")).not.toBeInTheDocument();

    expect(wrapper.queryByTestId("loading-indicator")).not.toBeInTheDocument();
  });
});
