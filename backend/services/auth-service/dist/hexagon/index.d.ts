import { RegisterUserUseCase } from './application/use-cases/RegisterUserUseCase';
import { LoginUseCase } from './application/use-cases/LoginUseCase';
import { RefreshTokenUseCase } from './application/use-cases/RefreshTokenUseCase';
import { GetHealthUseCase } from './application/use-cases/GetHealthUseCase';
export interface AuthHexContainer {
    registerUser: RegisterUserUseCase;
    login: LoginUseCase;
    refreshToken: RefreshTokenUseCase;
    getHealth: GetHealthUseCase;
}
export declare function buildContainer(): AuthHexContainer;
