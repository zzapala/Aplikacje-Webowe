import { sequelize } from './src/config/database';
import Orders from './src/models/Orders';

(async () => {
  try {
    // force: true -> usuwa tabelę jeśli istnieje i tworzy od nowa
    await sequelize.sync({ force: true });
    console.log('Tabela orders została utworzona od nowa z poprawnymi kolumnami.');
  } catch (err) {
    console.error('Błąd przy tworzeniu tabeli:', err);
  } finally {
    await sequelize.close();
  }
})();
