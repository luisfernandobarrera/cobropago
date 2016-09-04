import { configure } from '@kadira/storybook';

function loadStories() {
  require('../frontend/components/stories');
}

configure(loadStories, module);
