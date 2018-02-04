module.exports = {
    "extends": [
        "airbnb",
        "plugin:react/recommended",
        "prettier",
        "prettier/react"
    ],
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "prettier"
    ],
    "env": {
        "browser": true
    },
    "rules": {
        "no-confusing-arrow": "off",
        "react/jsx-filename-extension": "off",
        "react/no-unused-prop-types": "off",
        "react/forbid-prop-types": "off",
        "react/no-danger": "off",
        "quotes": ["error", "single"],
        "semi": ["error", "never"],
        "no-plusplus": "off",
        "import/no-named-as-default": "off",
        "import/no-named-as-default-member": "off",
        "no-nested-ternary": "off"
    }
};
