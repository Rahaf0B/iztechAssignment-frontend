import * as React from "react";
import MenuButton from "@mui/joy/MenuButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowRight from "@mui/icons-material/ArrowRight";
import Dropdown from "@mui/joy/Dropdown";

interface LayoutProps {
  options: {
    [key: string]: {
      title: string;

      color: string;

      handler: () => void;
    };
  };
  value?: string;
  icon: React.ReactNode;
  elementWidth: string;
  elementHeight: string;
  elementBorder: string;
  elementBorderRadius: number;
  backgroundColor?: string;
  textColor?: string;
}
function DropMenu(props: LayoutProps) {
  const [option, setOption] = React.useState(props.value);
  const [backgroundColor, setBackgroundColor] = React.useState(
    props.backgroundColor ? props.backgroundColor : "white"
  );
  const [textColor, setTextColorr] = React.useState(
    props.textColor ? props.textColor : "black"
  );

  return (
    <Dropdown>
      <MenuButton
        sx={{
          width: props.elementWidth,
          height: props.elementHeight,
          borderRadius: props.elementBorderRadius,
          border: props.elementBorder,
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-evenly !important",
          alignItems: "center !important",
          padding: 0,
          backgroundColor: backgroundColor,
          color: textColor,
          "&:hover": {
            backgroundColor: "transparent",
          },

          flexDirection: props.value ? "row-reverse" : "row",
        }}
        endDecorator={props.icon}
      >
        {props.value ? <span>{props.value.toString()}</span> : null}
      </MenuButton>

      <Menu sx={{ minWidth: 160, "--ListItemDecorator-size": "24px" }}>
        <ListItem nested>
          <List aria-label="Font sizes">
            {Object.entries(props.options).map(([key, optionSetting]) => (
              <MenuItem
                key={key}
                role="menuitemradio"
                aria-checked={optionSetting.title === option ? "true" : "false"}
                onClick={optionSetting.handler}
                sx={{ color: optionSetting.color }}
              >
                <ListItemDecorator>
                  {optionSetting.title === option && <ArrowRight />}
                </ListItemDecorator>{" "}
                {optionSetting.title}
              </MenuItem>
            ))}
          </List>
        </ListItem>
      </Menu>
    </Dropdown>
  );
}

export default DropMenu;
