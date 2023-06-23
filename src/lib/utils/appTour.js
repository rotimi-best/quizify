import Shepherd from 'shepherd.js';

// @ts-ignore
function generateFormTour(tour) {
  tour.addStep({
    id: 'example-step',
    arrow: true,
    text: `
    Hit the <span class="font-bold">Generate button</span> and see AI generate possible questions for your given text
    `,
    attachTo: {
      element: '#generate-form',
      on: 'top',
    },
    classes: '',
    modalOverlayOpeningPadding: 15,
    cancelIcon: {
      enabled: true,
      label: 'Close tutorial',
    },
    buttons: [
      {
        text: 'Next',
        action: tour.next,
        classes:
          'border-4 border-yellow-400 px-5 py-2 text-sm leading-5 rounded-lg font-semibold',
      },
    ],
  });
}

export function initTour() {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      classes:
        'w-72 shadow-lg bg-white text-black border-4 border-gray-200 rounded-lg',
      scrollTo: true,
    },
  });

  // @ts-ignore
  // generateFormTour(tour);

  // tour.start();
}
