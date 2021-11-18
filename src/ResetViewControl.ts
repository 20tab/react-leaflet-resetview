import { createControlComponent } from "@react-leaflet/core";
import {
  Control,
  Map,
  DomUtil,
  DomEvent,
  Util,
  ControlOptions,
  LatLng,
} from "leaflet";

export type ResetViewControlOptions = {
  /**
   * The control title.
   */
  title?: string;

  /**
   * The control icon. Can be either a path for url() or a unicode character.
   * It renders a box by default.
   */
  icon?: string;
} & ControlOptions;

const _getControl = Control.extend({
  options: { position: "topleft", title: "Reset map view", icon: "\u2610" },

  onAdd: function (map: Map) {
    Util.setOptions(this, {
      zoom: map.getZoom(),
      center: map.getCenter(),
    });

    const { title, icon } = this.options;

    const container = DomUtil.create("div", "leaflet-bar");
    const link = DomUtil.create("a", "", container);

    const linkAttrs = {
      title,
      href: "#",
    };

    Object.entries(linkAttrs).forEach(([k, v]) => {
      link.setAttribute(k, v);
    });

    link.innerHTML = icon;

    if (RegExp(/url\(.+\)/).test(icon)) {
      link.innerHTML = "";
      link.style.backgroundImage = icon;
    }

    DomEvent.on(link, "mousedown dblclick", DomEvent.stopPropagation)
      .on(link, "click", DomEvent.stop)
      .on(link, "click", this._resetView, this);

    return container;
  },

  _resetView: function (this: {
    options: { zoom: number; center: LatLng };
    _map: Map;
  }) {
    const { center, zoom } = this.options;
    return this._map.setView(center, zoom);
  },
});

const _createControl = (props: ResetViewControlOptions) =>
  new _getControl(props);

export default createControlComponent<
  ReturnType<typeof _createControl>,
  ResetViewControlOptions
>(_createControl);
