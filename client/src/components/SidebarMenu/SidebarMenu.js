import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
// import "./SidebarMenu.css";

const styles = `nav {
  position: sticky;
  top: 15rem;
  background-color: #f9f9f9;
}

.MuiListItemButton-gutters {
  padding: 2px 1.5rem;
}

.MuiListItemText-primary {
  color: #525252;
  opacity: 65%;
  font-size: 1.3rem;
  font-weight: 700;
}

.MuiListItemText-secondary {
  color: #525252;
  opacity: 75%;
  font-size: 1rem;
}
.MuiListItemButton-root.Mui-selected {
  background-color: #f9f9f9;
}
.MuiListItemButton-root.Mui-selected .MuiListItemText-secondary {
  font-weight: 700;
}
`;

const SidebarMenu = ({ categoryData, onCategoryClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryClick = (subCategoryId) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === subCategoryId ? null : subCategoryId
    );
    onCategoryClick(subCategoryId);
  };
  return (
    <>
      <style>{styles}</style>
      <nav>
        <List>
          {Object.keys(categoryData).map((category, index) => (
            <div key={category}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={category} />
                </ListItemButton>
              </ListItem>
              {categoryData[category].map((subCategoryData, subIndex) => (
                <ListItem disablePadding key={subCategoryData.subCategory}>
                  <ListItemButton
                    selected={subCategoryData.id === selectedCategory}
                    onClick={() => handleCategoryClick(subCategoryData.id)}
                  >
                    <ListItemText secondary={subCategoryData.subCategory} />
                  </ListItemButton>
                </ListItem>
              ))}
            </div>
          ))}
        </List>
      </nav>
    </>
  );
};

export default SidebarMenu;
