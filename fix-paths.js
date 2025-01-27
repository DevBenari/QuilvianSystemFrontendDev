const replace = require("replace-in-files");

const options = [
  // Update untuk CustomSearchFilter
  {
    files: "./src/app/pendaftaran/**/*.jsx", // Targetkan semua file JSX di folder pendaftaran
    from: /import CustomSearchFilter from '@\/components\/features\/CustomSearchComponen\/Form-search-dashboard';/g, // Jalur lama
    to: `import CustomSearchFilter from '@/components/features/custom-search/CustomSearchComponen/Form-search-dashboard';`, // Jalur baru
  },
  // Update untuk CustomTableComponent
  {
    files: "./src/app/pendaftaran/**/*.jsx",
    from: /import CustomTableComponent from '@\/components\/features\/CustomTable\/custom-table';/g,
    to: `import CustomTableComponent from '@/components/features/CustomTable/custom-table';`,
  },
  // Update untuk DynamicForm
  {
    files: "./src/app/pendaftaran/**/*.jsx",
    from: /import DynamicForm from "@\/components\/features\/dynamicForm\/dynamicForm";/g,
    to: `import DynamicForm from "@/components/features/dynamic-form/dynamicForm/dynamicForm";`,
  },
  // Update untuk DataTable
  {
    files: "./src/app/pendaftaran/**/*.jsx",
    from: /import DataTable from "@\/components\/features\/viewDataTables\/dataTable";/g,
    to: `import DataTable from "@/components/features/custom-table/viewDataTables/dataTable";`,
  },
];

async function replacePaths() {
  try {
    for (const opt of options) {
      const results = await replace(opt);
      console.log(`Updated files for pattern "${opt.from}":`, results);
    }
    console.log("All paths have been updated successfully!");
  } catch (error) {
    console.error("An error occurred while updating paths:", error);
  }
}

// Jalankan fungsi replacePaths
replacePaths();
