import React, { useState, useEffect } from "react";
import { Box, Container, accordionClasses } from "@mui/material";
import MenuAccordion from "../../components/MenuAccordion/MenuAccordion";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import { fetchCategoryData } from "../../services/categoryService";
// import "./MenuContainer.css";

const styles = `.brewhubMenu-flex-container {
  display: flex;
  gap: 5rem;
  margin-top: 10rem;
}

.brewhubMenu-sidebar-box {
  flex: 1;
}

.brewhubMenu-menu-box {
  flex: 2;
}

@media (max-width: 600px) {
  .brewhubMenu-flex-container {
    flex-direction: column;
  }
}
`;

const MenuContainer = () => {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (subCategoryId) => {
    setExpandedCategory((prevExpandedCategory) =>
      prevExpandedCategory === subCategoryId ? null : subCategoryId
    );
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await fetchCategoryData();
        const groupedData = categories.reduce((acc, item) => {
          const { category, subCategory, id } = item;

          if (!acc[category]) {
            acc[category] = [];
          }

          acc[category].push({ subCategory, id });
          return acc;
        }, {});

        setCategories(groupedData);
      } catch (error) {
        // Handle error if needed
      }
    }
    fetchCategories();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <Container maxWidth="lg" className="brewhubMenu-flex-container">
        <Box className="brewhubMenu-sidebar-box">
          <SidebarMenu
            categoryData={categories}
            onCategoryClick={handleCategoryClick}
          />
        </Box>
        <Box className="brewhubMenu-menu-box">
          {Object.keys(categories).map((category, index) =>
            categories[category].map((subCategoryData, subIndex) => (
              <MenuAccordion
                key={index + "" + subIndex}
                subCategoryData={subCategoryData}
                expandedCategory={expandedCategory}
              />
            ))
          )}
        </Box>
      </Container>
    </>
  );
};

export default MenuContainer;
