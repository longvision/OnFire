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
      quantity: 'quantity',
      cost: 'cost',
      Recipes_name: "Recipe's Name",
      Recipe_name_is_required: 'Recipe name is required.',
      Description_is_required: 'Recipe description is required.',
      CREATE_RECIPE: 'CREATE RECIPE',
      Select_the_ingredient: 'Select the ingredient',
      Add_new_ingredient: 'Add new ingredient',
      Select_the_unit_of_measurement: 'Select the unit of measurement',
      Unit: 'Unit',
      Quantity_to_be_added: 'Quantity to be added',
      ADD_TO_RECIPE: 'ADD TO RECIPE',
      Ingredient_name_is_required: `Ingredient's name is required.required`,
      Unit_is_required: `Unit of measurement is required.`,
      Quantity_is_required: `Quantity is required.`,
      Enter_the_ingredient_amount: `Enter the quantity for this ingredient`,
      Invalid_Unit: 'Invalid unit !',
      Change_Unit:
        'Please select a unit that matches the registered ingredient',
      Generic_Error_Description: 'Ingredient creation error',
      Generic_Error: 'Error !',
      Too_Short: 'Too Short !',
      Too_Long: 'Too Long !',
      Brand_is_required: 'Brand is required.',
      Seller_is_required: 'Seller name is required.',
      Package_size_is_required: 'Package size is required.',
      Package_unit_is_required: 'Package unit is required.',
      Package_price_is_required: 'Package price is required.',
      $: '$',
      NO_ACCOUNT: "Don't have an account? Sign Up here!",
      HELLO: 'HELLO',
      SIGN_INTO: 'Sign in to your account',
      SIGN_IN: 'Sign In',
      FORGOT_PASS: 'Forgot your password?',
      Invalid_Email: 'Invalid email!',
      Check_Email: 'Please check if the email typed is correct.',
      RESET_PASSWORD: 'RESET PASSWORD',
      Valid_Email: 'Password recovery',
      Check_Inbox: 'Check your email inbox to create a new password.',
      Forgot_Password: 'Forgot Password',
      Enter_email: 'Please enter your email address',
      Enter_Token: 'Enter your TOKEN',
      Password: 'Password',
      Password_confirmation: 'Password Confirmation',
      Reset_failed: 'Password Reset Failure',
      Reset_success: 'Password Reset Success',
      Login_again: 'You can now login using your new password!',
      Retry_reset: 'Request a new token to create a new password.',
      Account_created: 'Account successfully created!',
      Login_now: 'You can now access the app',
      Complete_the_form: 'Please complete the form',
      Terms_and_conditions:
        'You need to read and accept the terms and conditions first',
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
      Ingredient_Name: 'Nome do ingrediente',
      Brand: 'Marca do produto',
      Seller: 'Vendedor',
      Region: 'Regiào da compra',
      Package_Size: 'Tamanho da embalagem',
      Package_Unit: 'Unidade de medida da embalagem',
      Package_Price: 'Preço do produto',
      Save: 'Salvar',
      Package_Info: 'Dados da embalagem',
      quantity: 'quantidade',
      cost: 'custo',
      Recipes_name: 'Nome da receita',
      Recipe_name_is_required: 'O nome da receita é necessário.',
      Description_is_required: 'A descrição do produto é necessária.',
      CREATE_RECIPE: 'CRIAR RECEITA',
      Select_the_ingredient: 'Selecione o ingrediente',
      Add_new_ingredient: 'Adicione novo ingrediente',
      Select_the_unit_of_measurement: 'Selecione a unidade de medida',
      Unit: 'Unidade',
      Quantity_to_be_added: 'Quantidade a ser adicionada',
      ADD_TO_RECIPE: 'ADICIONAR À RECEITA',
      Ingredient_name_is_required: 'Nome do ingrediente é obrigatório.',
      Unit_is_required: `Unidade de medida é necessária.`,
      Quantity_is_required: `Quantidade é necessária.`,
      Enter_the_ingredient_amount: `Digite a quantidade de ingrediente`,
      Invalid_Unit: 'Unidade inválida !',
      Change_Unit:
        'Por favor escolha uma unidade que coincida com a unidade da embalagem cadastrada como ingrediente anteriormente.',
      Generic_Error_Description:
        'Algo deu errado no cadastro deste ingrediente.',
      Generic_Error: 'Erro !',
      Too_Short: 'Muito curto !',
      Too_Long: 'Muito Longo !',
      Brand_is_required: 'A marca do produto é necessária !',
      Seller_is_required: 'O nome do vendedor é necessário !',
      Package_size_is_required: 'Tamanho da embalagem é necessária !',
      Package_unit_is_required: 'Unidade da embalagem é necessária !',
      Package_price_is_required: 'Preço do pacote/produto é necessário !',
      $: 'R$',
      NO_ACCOUNT: 'Não possui uma conta? Crie uma aqui!',
      HELLO: 'Olá',
      SIGN_INTO: 'Entre com a sua conta',
      SIGN_IN: 'Entrar',
      FORGOT_PASS: 'Esqueceu sua senha?',
      Invalid_Email: 'Email inválido!',
      Check_Email: 'Por favor verifique se o email digitado está correto.',
      RESET_PASSWORD: 'CRIAR NOVA SENHA',
      Valid_Email: 'Pedido solicitado com sucesso!',
      Check_Inbox:
        'Verifique sua caixa de entrada de email para criar uma nova senha.',
      Forgot_Password: 'Esqueci minha Senha',
      Enter_email: 'Por favor digite o seu email',
      Enter_Token: 'Digite o TOKEN enviado para seu email',
      Password: 'Senha',
      Password_confirmation: 'Confirmação de Senha',
      Reset_failed: 'Erro na redefinição da senha',
      Reset_success: 'Senha redefinida',
      Login_again:
        'Agora você pode logar na sua conta usando a sua senha nova.',
      Retry_reset: 'Solicite a criação da sua senha novamente.',
      Account_created: 'Conta criada com sucesso!',
      Login_now: 'Agora você pode logar no aplicativo!',
      Complete_the_form: 'Por favor complete o formulário!',
      Terms_and_conditions:
        'Você precisa ler e aceitar os termos e condições do aplicativo.',
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
