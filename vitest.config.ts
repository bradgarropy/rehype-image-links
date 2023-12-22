import tsconfigPaths from "vite-tsconfig-paths"
import {defineConfig} from "vitest/config"

const config = defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        coverage: {
            all: false,
            provider: "v8",
            reporter: ["text", "lcov"],
        },
        environment: "node",
        passWithNoTests: true,
        watch: false,
    },
})

export default config
