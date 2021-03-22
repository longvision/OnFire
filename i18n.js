import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      INGREDIENTS: 'INGREDIENTS',
      RECIPES: 'RECIPES',
      Recipes: 'Recipes',
      Shelf: 'Shelf',
      Ingredients: 'Ingredients',
      Kitchen: 'Kitchen',
      Create_Recipes: 'Create Recipe',
      Description: 'Description',
      Details: 'Details',
      Measures: 'Measures',
      DELETE: 'DELETE',
      Ingredient: 'Ingredient',
      Add_Ingredient: 'Add Ingredient',
      Total_Cost: 'Total Cost',
      items: 'items',
      Delete_Recipe: 'Delete Recipe',
      Product_info: 'Product info',
      Ingredient_Name: 'Ingredient Name',
      Brand: 'Brand',
      Seller: 'Seller',
      Region: 'Purchase Region',
      Package_Size: 'Product Size',
      Package_Unit: 'Product Unit',
      Package_Price: 'Product Price',
      Save: 'Save',
      Package_Info: 'Package Info',
    },
  },
  pt: {
    translation: {
      INGREDIENTS: 'INGREDIENTES',
      RECIPES: 'RECEITAS',
      Recipes: 'Receitas',
      Shelf: 'Prateleira',
      Ingredients: 'Ingredientes',
      Kitchen: 'Cozinha',
      Create_Recipes: 'Nova Receita',
      Description: 'Descrição',
      Details: 'Detalhes',
      Measures: 'Medidas',
      DELETE: 'APAGAR',
      Ingredient: 'Ingrediente',
      Add_Ingredient: 'Adicionar Ingrediente',
      Total_Cost: 'Custo Total',
      items: 'itens',
      Delete_Recipe: 'Apagar Receita',
      Product_info: 'Dados do Produto',
      Ingredient_Name: 'Nome do Ingrediente',
      Brand: 'Marca do produto',
      Seller: 'Vendedor',
      Region: 'Regiào da compra',
      Package_Size: 'Tamanho da Embalagem',
      Package_Unit: 'Unidade Escrita na Embalagem',
      Package_Price: 'Preço do Produto',
      Save: 'Salvar',
      Package_Info: 'Dados da Embalagem',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'pt',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
