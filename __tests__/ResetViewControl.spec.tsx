import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MapContainer, useMapEvents } from "react-leaflet";
import ResetViewControl from "../src/ResetViewControl";

describe("ResetViewControl", () => {
  const mockHandleViewReset = jest.fn();

  const ControlWrapper = () => {
    useMapEvents({
      viewreset: mockHandleViewReset,
    });

    return (
      <>
        <ResetViewControl title="Reset view" />
      </>
    );
  };
  const Map = () => {
    return (
      <MapContainer zoom={5} center={[-96.8716348, 32.8205866]}>
        <ControlWrapper />
      </MapContainer>
    );
  };

  test("can reset map view", () => {
    render(<Map />);

    userEvent.click(screen.getByTitle(/zoom out/i));
    userEvent.click(screen.getByTitle("Reset view"));

    expect(mockHandleViewReset).toHaveBeenCalledTimes(2);
  });
});
