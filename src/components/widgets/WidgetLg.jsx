import React from "react";
import "./WidgetLg.css";

export default function WidgetLg({
  style,
  title,
  bodyNumber,
  Icon,
  footerNumber,
  footerTitle,
}) {
  return (
    <div className="widgetLgWrapper" style={style}>
      <div className="widgetLgTitle">{title}</div>
      <div className="widgetLgBody">
        <h3>{bodyNumber}</h3>
        {Icon}
      </div>
      <div className="widgetLgFooter">
        <h3>{footerNumber}</h3>
        <h4>{footerTitle}</h4>
      </div>
    </div>
  );
}
