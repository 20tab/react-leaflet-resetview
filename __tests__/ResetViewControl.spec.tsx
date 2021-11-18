import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { MapContainer, useMapEvents } from "react-leaflet";
import ResetViewControl from "../src/ResetViewControl";
import { ResetViewControlOptions } from "../src/ResetViewControl";

describe("ResetViewControl", () => {
  const mockHandleViewReset = jest.fn();

  const ControlWrapper = ({ title, icon }: ResetViewControlOptions) => {
    useMapEvents({
      viewreset: mockHandleViewReset,
    });

    return (
      <>
        <ResetViewControl
          title={title ?? "Reset view"}
          icon={icon ?? "\u2612"}
        />
      </>
    );
  };
  const Map = ({ title, icon }: ResetViewControlOptions) => {
    return (
      <MapContainer zoom={5} center={[-96.8716348, 32.8205866]}>
        <ControlWrapper title={title} icon={icon} />
      </MapContainer>
    );
  };

  test("can reset map view", () => {
    render(<Map />);

    userEvent.click(screen.getByTitle(/zoom out/i));
    userEvent.click(screen.getByTitle("Reset view"));

    expect(mockHandleViewReset).toHaveBeenCalledTimes(2);
  });

  test("can see icon", () => {
    render(<Map />);

    screen.getByText("\u2612");
  });

  test("can set icon", () => {
    render(<Map icon="url(/some/relative/path.png)" />);

    expect(screen.getByTitle("Reset view")).toHaveStyle({
      "background-image": "url(/some/relative/path.png)",
    });
  });

  test("link has href", () => {
    render(<Map />);
    expect(screen.getByTitle("Reset view")).toHaveAttribute("href", "#");
  });
});
