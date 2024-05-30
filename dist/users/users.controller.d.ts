import { UsersService } from './users.service';
import { UserDto, UserCreateDto, UserUpdateDto } from './dto/dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    createUser(userData: UserCreateDto): Promise<UserDto>;
    getUserById(id: string): Promise<UserDto>;
    updateUser(id: string, userData: UserUpdateDto): Promise<UserDto>;
    deleteUser(id: string): Promise<void>;
    private toUserDto;
}
