import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
  main: {
    tab: {
      add: 'Add a game'
    },
    head: {
      'toggle-audio-on': 'Enable sound',
      'toggle-audio-off': 'Mute',
      'new-window': 'Open a new window'
    },
    prompt: {
      'tabs-overflow': {
        text: "Lindo doesn't support more than 6 tab per window, above that it can be laggy and buggy. But you can open a new window and it will be working just fine."
      }
    }
  },
  notifications: {
    fightTurn: 'Starting turn for {characterName: string}',
    privateMessage: 'Incoming message from {senderName: string}',
    taxCollector: 'A tax collector is being attacked !',
    kolizeum: 'A Kolizeum has been found !',
    partyInvitation: "You are invited to join {sendName: string}'s group.",
    aggression: 'You have been aggressed !',
    saleMessage: 'Bank'
  },
  window: {
    changelog: {
      title: 'Release notes',
      prefixe: 'Release'
    },
    'master-password': {
      continue: 'Continue',
      skip: 'Skip this step',
      'password-label': 'Enter the master password',
      'password-bad': 'The password is incorrect'
    },
    'update-dofus': {
      title: 'Lindo update',
      step0: 'Preparing update..',
      step1: 'Step 1 : Downloading Dofus files',
      step2: 'Step 2 : Lindo patch download',
      step3: 'Step 3 : Version resolution',
      step4: 'Step 4 : Applying the patches',
      step5: 'Step 5 : Writing modified files',
      step6: 'Step 6 : Delete old files',
      step7: 'Step 7 : Finalization',
      step8: 'Step 8 : Launch of Lindo..',
      information: {
        search: 'Looking for updates...',
        error: "Can't download the update ! Please try again later",
        retry: 'Try again'
      }
    },
    options: {
      title: 'Options',
      button: {
        close: 'Completed'
      },
      general: {
        'reset-game': 'Re-download game data',
        'reset-all': 'Reset',
        shortcuts: 'Configure',
        'clear-cache': 'Clear cache',
        resolution: {
          'confirm-body': 'Does the current resolution suit you?<br/>Automatic reset within 10 seconds..'
        }
      }
    },
    shortcuts: {
      title: 'Shortcuts',
      description1: 'You can use special keys CTRL, SHIFT, SPACE, ALT (CTRL = cmd on Mac OS X)',
      description2:
        'You can specify your shortcut by pressing the desired keys at the same time after selecting the input',
      tab: {
        application: 'Application',
        interface: 'Interface',
        spell: 'Spells',
        inventory: 'Inventory',
        other: 'Various',
        mod: 'Mods'
      }
    },
    'bug-report': {
      title: 'Report a bug',
      description: "If you've observed an unexpected behavior on Lindo, you can report it by describing it below.",
      instructions: 'Please provide at least these information:',
      list: {
        '1': 'The unexpected behavior description',
        '2': 'How to reproduce it',
        '3': 'What would the usual expected behavior be'
      },
      placeholder: 'Description',
      send: 'Send'
    }
  },
  option: {
    vip: {
      'auto-group': {
        header: 'Group',
        active: 'Enable automatic grouping',
        warning:
          'Beware, following the group leader can be considered as boting for other players, use it with caution and in unpopulated areas.',
        warningtimer:
          'Beware, This feature can be considered as boting for other players, use it with caution and in unpopulated areas.',
        'explanation-1':
          'The characters in the group must be friends with the leader so that the invitation is automatic.',
        'explanation-2': 'The members follow the leader if the latter is on the same map.',
        leader: 'Name of leader',
        members: 'Names of characters',
        'members-add': 'Add a character',
        'follow-leader': 'Follow the group leader',
        'disable-timer': 'Disable the Timer for the auto group',
        ready: 'Skip "ready" automatically',
        fight: 'Enter combat automatically',
        delay: 'Time to follow (in seconds)',
        'follow-on-map': 'Follow the leader on a map',
        'strict-move': 'Move on the same cell the leader moves',
        'pvp-warning': "You can't join a PvP fight automatically"
      },
      'multi-account': {
        'home-no-master':
          'To use this feature, a password must be configured. It will be used to start Lindo with multi-account automation.',
        header: 'Multi accounts',
        active: 'Enable multi accounts',
        window: 'Window',
        'delete-window': 'Delete',
        'add-window': 'Add a window',
        add: 'Add an account',
        'account-name': 'Username',
        password: 'Password',
        modify_password: 'Change the password',
        configure_password: 'Setting password',
        delete_password: 'Removing the password',
        'request-master-password': {
          explanation:
            'To access your account management, you must first enter your master password. This password was set on the first activation of the multi-account.',
          label: 'Enter your password',
          bad: 'The password is incorrect',
          confirm: 'Carry on',
          'ignore-step': 'Skip this step'
        },
        prompt: {
          'add-master': {
            title: 'Setting the Password',
            confirm: 'Save',
            cancel: 'Cancel',
            'min-lenght': 'The password must contain at least lenght}} characters',
            'success-text': 'The password will now be used to start the application.'
          },
          'edit-master': {
            title: 'Changing the password',
            'input-old-placeholder': 'Old password',
            'input-new-placeholder': 'New password',
            confirm: 'Save',
            cancel: 'Cancel',
            'min-lenght': 'The new password must contain at least {lenght:number} characters',
            'incorrect-old': 'The old password is incorrect',
            'success-text': 'The password has been changed.'
          },
          'delete-master': {
            title: 'Removing the password',
            text: 'Are you sure?<br/>This will delete the saved accounts.',
            confirm: 'Remove',
            cancel: 'Cancel',
            'success-text': 'The password has been deleted.'
          },
          'maximum-account': {
            title: 'Oops!',
            text: 'You can not save more than 4 accounts without Wabbit donor rank.',
            confirm: 'Increase my VIP rank',
            cancel: 'I understood'
          },
          'add-account': {
            title: 'Adding an account',
            'input-login-placeholder': 'Username',
            'input-password-placeholder': 'Password',
            confirm: 'Save',
            cancel: 'Cancel',
            'min-lenght-login': 'The username must contain at least 1 character',
            'min-lenght-password': 'The password must contain at least 1 character'
          },
          'edit-account': {
            title: 'Changing an account',
            'input-login-placeholder': 'Username',
            'input-password-placeholder': 'Password',
            confirm: 'Save',
            cancel: 'Cancel',
            'min-lenght-login': 'The username must contain at least 1 character',
            'min-lenght-password': 'The password must contain at least 1 character'
          }
        }
      },
      zaapsearchfilter: {
        placeholder: 'Search a zaap',
        placeholderZaapi: 'Search a zaapi',
        placeholderPrisme: 'Search a prisme'
      },
      'party-info': {
        'header-lvl': "Show party's level",
        'header-pp': "Show party's prospecting",
        level: 'Lvl.'
      },
      jobsxp: {
        text: ' XP missing<br>before level '
      },
      monstertooltip: {
        level: 'Level',
        group: 'Group'
      }
    },
    general: {
      title: 'General',
      interface: 'Interface',
      sound: 'Sound',
      shortcuts: 'Keyboard shortcuts',
      'game-data': 'Game data',
      language: 'Language',
      resolution: 'Resolution',
      'hide-shop': 'Hide the Shop button',
      'full-screen': 'Full screen',
      'hide-tab': 'Hide the multi-account tab bar',
      'focus-fight-turn': 'Automatically switch to an account when its turn starts',
      'local-content': 'Enable local map download (beta)',
      'sound-focus': 'Game sound only on foreground window',
      early: 'Play on Dofus Touch Early',
      restart: 'Apply and restart'
    },
    shortcuts: {
      title: 'Shortcuts',
      diver: {
        header: 'Miscellaneous',
        'end-turn': 'End your turn / Ready (fight)',
        'open-chat': 'Open the chat',
        'active-open-menu': 'Open menu when no window is open (ECHAP)',
        'open-menu': 'Open the menu',
        go_up: 'Go to Upper Map',
        go_bottom: 'Go to Lower Map',
        go_left: 'Go to Left Map',
        go_right: 'Go to Right Map'
      },
      interfaces: {
        header: 'Interfaces',
        carac: 'Character',
        spell: 'Spells',
        bag: 'Inventory',
        bidhouse: 'Market place',
        map: 'Map',
        friend: 'Friends',
        book: 'Quests',
        guild: 'Guild',
        conquest: 'Kolizeum',
        goultine: 'Shop',
        job: 'Jobs',
        alliance: 'Alliance',
        mount: 'Mount',
        directory: 'List of Guilds and Alliances',
        alignement: 'Alignment',
        bestiary: 'Bestiary',
        title: 'Titles and Ornaments',
        achievement: 'Achievements',
        dailyQuest: 'Daily Quests',
        spouse: 'Spouse',
        shop: 'Shopkeeper'
      },
      items: {
        header: 'Items',
        slot: 'Slot {x:number}'
      },
      'no-emu': {
        header: 'Lindo',
        'new-window': 'New window',
        'new-tab': 'New tab',
        tab: 'Tab {x:number}',
        'next-tab': 'Next tab',
        'prev-tab': 'Previous tab'
      },
      spells: {
        header: 'Spells',
        slot: 'Slot {x:number}'
      },
      mods: {
        'show-resources': 'Show/hide map resources',
        'health-bar': 'Show/hide life bars',
        'monster-tooltip': 'Show/hide monsters tooltip'
      }
    },
    features: {
      title: 'Features',
      general: {
        menu: {
          general: 'General',
          fight: 'Fight',
          group: 'Group',
          job: 'Job'
        },
        header: 'General',
        'disable-inactivity': 'Extend the delay before disconnection for inactivity',
        'health-bar': 'Activate the display of the life bars below the fighters',
        jobsxp: 'Activate the display of the job xp need for leveling',
        estimator: 'Estimating spell damage in battle',
        fightchronometer: 'Show combats chronometer',
        zaapsearchfilter: 'Show zaap search filter',
        'show-resources': 'Show map resources',
        'harvest-indicator': 'Activate the display of the remaining time below the ressources',
        'party-member-on-map': 'Add an indicator to know if the members of a group are on the same map',
        'monster-tooltip': 'Display monsters groups informations on the map',
        'monster-tooltip-shortcut': 'Shortcut for show/hide monsters tooltip',
        'vertical-timeline': 'Show fighters timeline vertically',
        'chall-percent': 'Show challenge XP/Drop bonus'
      },
      groups: {
        header: 'Groups'
      },
      accounts: {
        header: 'Accounts'
      }
    },
    notifications: {
      title: 'Notifications',
      description:
        'You can receive notifications from the game when the application is on the background. You will be notified:',
      fightTurn: 'When your turn starts (fight)',
      privateMessage: 'By incoming private messages',
      'tax-collector': 'When a tax collector is attacked',
      kolizeum: 'When a kolizeum fight is found',
      'party-invitation': 'When someone invites you to join a group',
      aggression: 'When someone aggresses you',
      'sale-message': 'When an item is sold'
    },
    about: {
      title: 'About',
      links: {
        website: 'Website',
        changelog: 'Release notes'
      },
      text0: 'Lindo is an open-source software that allows you to play DOFUS Touch from your computer.',
      text1:
        'Unlike an Android emulator, the code is directly interpreted by your computer, which makes it faster so you can play DOFUS Touch with the full performance of your computer !',
      text2:
        'Originally known as DOFUS Touch No-Emu, this software developed by Daniel and Thomas was forced to close cause of an avertissement from Ankama.'
    },
    reset: 'Reset',
    save: 'Apply',
    prompt: {
      'reset-option': {
        text: 'By continuing, all parameters will be reset.<br/>This operation is not reversible.'
      }
    }
  },
  prompt: {
    title: {
      confirm: 'Confirmation required',
      warning: 'Warning !',
      success: 'Successful operation !',
      error: 'Operation failed !',
      info: 'Information'
    },
    button: {
      cancel: 'Cancel',
      confirm: 'I confirm',
      close: 'Close'
    }
  }
}

export default en
