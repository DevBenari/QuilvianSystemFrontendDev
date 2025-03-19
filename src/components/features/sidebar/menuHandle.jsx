// Helper functions untuk menangani berbagai tipe menu di sidebar

/**
 * Fungsi untuk mendapatkan nested menu dari item submenu
 * @param {Object} subMenuItem - Item submenu yang dipilih
 * @returns {Array} Array menu nested yang sesuai, atau array kosong jika tidak ada
 */
export const getNestedMenuFromSubItem = (subMenuItem) => {
  if (!subMenuItem) return [];

  // Cek semua jenis menu nested yang mungkin
  // Tambahkan jenis menu baru di sini saat diperlukan
  if (subMenuItem.masterDataMenu) {
    return subMenuItem.masterDataMenu;
  } else if (subMenuItem.pendaftaranMenu) {
    return subMenuItem.pendaftaranMenu;
  } else if (subMenuItem.menuIGD) {
    return subMenuItem.menuIGD;
  } else if (subMenuItem.menuLaboratorium) {
    return subMenuItem.menuLaboratorium;
  } else if (subMenuItem.menuRawatJalan) {
    return subMenuItem.menuRawatJalan;
  } else if (subMenuItem.menuRawatInap) {
    return subMenuItem.menuRawatInap;
  } else if (subMenuItem.menuOperasi) {
    return subMenuItem.menuOperasi;
  } else if (subMenuItem.menuRadiologi) {
    return subMenuItem.menuRadiologi;
  } else if (subMenuItem.menuRehabilitasi) {
    return subMenuItem.menuRehabilitasi;
  } else if (subMenuItem.menuMCU) {
    return subMenuItem.menuMCU;
  } else if (subMenuItem.menuBayi) {
    return subMenuItem.menuBayi;
  } else if (subMenuItem.menuOptik) {
    return subMenuItem.menuOptik;
  } else if (subMenuItem.menuFarmasi) {
    return subMenuItem.menuFarmasi;
  }
  // Tambahkan pengecekan untuk jenis menu baru di sini
  // else if (subMenuItem.namaMenuBaru) {
  //   return subMenuItem.namaMenuBaru;
  // }

  return [];
};

/**
 * Cek apakah submenu memiliki nested menu
 * @param {Object} subMenuItem - Item submenu yang diperiksa
 * @returns {Boolean} True jika memiliki nested menu, false jika tidak
 */
export const hasNestedMenu = (subMenuItem) => {
  if (!subMenuItem) return false;

  // Cek apakah item memiliki salah satu jenis nested menu
  return !!(
    (
      subMenuItem.masterDataMenu?.length ||
      subMenuItem.pendaftaranMenu?.length ||
      subMenuItem.menuIGD?.length ||
      subMenuItem.menuRadiologi?.length ||
      subMenuItem.menuLaboratorium?.length ||
      subMenuItem.menuFarmasi?.length ||
      subMenuItem.menuRawatJalan?.length ||
      subMenuItem.menuRawatInap?.length ||
      subMenuItem.menuOperasi?.length ||
      subMenuItem.menuRadiologi?.length ||
      subMenuItem.menuRehabilitasi?.length ||
      subMenuItem.menuMCU?.length ||
      subMenuItem.menuBayi?.length ||
      subMenuItem.menuOptik?.length ||
      subMenuItem.menuFarmasi?.length
    )
    // Tambahkan pengecekan untuk jenis menu baru di sini
    // || subMenuItem.namaMenuBaru?.length
  );
};

/**
 * Fungsi untuk memeriksa apakah path ada di nested menu
 * @param {Array} nestedMenu - Array menu nested yang akan diperiksa
 * @param {String} pathToCheck - Path yang dicari
 * @returns {Object|null} Object dengan key, category, dan nestedItem jika ditemukan, null jika tidak
 */
export const findPathInNestedMenu = (nestedMenu, pathToCheck) => {
  if (!nestedMenu || !pathToCheck) return null;

  for (const category of nestedMenu) {
    if (category.subItems) {
      for (const nestedItem of category.subItems) {
        if (nestedItem.href === pathToCheck) {
          return {
            key: category.key,
            category: category,
            nestedItem: nestedItem,
          };
        }
      }
    }
  }

  return null;
};
