import accountHandlers from './accounts';
import appHandlers from './app';
import blogHandlers from './blogs';

const handlers = [...appHandlers, ...accountHandlers, ...blogHandlers];

export default handlers;
