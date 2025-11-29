/// <reference types="vite/client" />

// Expose our environment variables we rely on in the frontend
interface ImportMetaEnv {
	readonly VITE_API_FASTAPI?: string;
	readonly VITE_API_NODE?: string;
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}

