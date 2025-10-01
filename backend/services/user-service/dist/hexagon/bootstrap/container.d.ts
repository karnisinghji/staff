import { GetCompleteProfileUseCase } from '../application/use-cases/GetCompleteProfile';
import { UpdateUserUseCase } from '../application/use-cases/UpdateUser';
import { UpdateWorkerProfileUseCase } from '../application/use-cases/UpdateWorkerProfile';
import { UpdateContractorProfileUseCase } from '../application/use-cases/UpdateContractorProfile';
import { ListContactsUseCase, CreateContactUseCase, UpdateContactUseCase, DeleteContactUseCase } from '../application/use-cases/Contacts';
import { ListSkillsUseCase } from '../application/use-cases/ListSkills';
import { GeneratePasswordResetUseCase } from '../application/use-cases/GeneratePasswordReset';
export interface HexContainer {
    getCompleteProfile: GetCompleteProfileUseCase;
    updateUser: UpdateUserUseCase;
    updateWorkerProfile: UpdateWorkerProfileUseCase;
    updateContractorProfile: UpdateContractorProfileUseCase;
    listContacts: ListContactsUseCase;
    createContact: CreateContactUseCase;
    updateContact: UpdateContactUseCase;
    deleteContact: DeleteContactUseCase;
    listSkills: ListSkillsUseCase;
    generatePasswordReset: GeneratePasswordResetUseCase;
}
export declare function getHexContainer(): HexContainer;
export declare function __setHexContainerForTests(mock: HexContainer): void;
