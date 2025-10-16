import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneByWalletAddress', () => {
    it('should return a user when found', async () => {
      const walletAddress = 'test-wallet-address';
      const mockUser = { id: 1, walletAddress, name: 'Test User' } as User;
      
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      
      const result = await service.findOneByWalletAddress(walletAddress);
      
      expect(result).toEqual(mockUser);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { walletAddress } });
    });

    it('should return null when user is not found', async () => {
      const walletAddress = 'non-existent-wallet';
      
      mockUserRepository.findOne.mockResolvedValue(null);
      
      const result = await service.findOneByWalletAddress(walletAddress);
      
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and save a new user', async () => {
      const walletAddress = 'new-wallet-address';
      const mockUser = { id: 1, walletAddress } as User;
      
      mockUserRepository.create.mockReturnValue(mockUser);
      mockUserRepository.save.mockResolvedValue(mockUser);
      
      const result = await service.create(walletAddress);
      
      expect(result).toEqual(mockUser);
      expect(repository.create).toHaveBeenCalledWith({ walletAddress });
      expect(repository.save).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('update', () => {
    it('should update and return a user', async () => {
      const userId = 1;
      const updateUserDto = { name: 'Updated Name' };
      const mockUser = { id: userId, walletAddress: 'test-wallet', ...updateUserDto } as User;
      
      mockUserRepository.update.mockResolvedValue(undefined);
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      
      const result = await service.update(userId, updateUserDto);
      
      expect(result).toEqual(mockUser);
      expect(repository.update).toHaveBeenCalledWith(userId, updateUserDto);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
    });
  });
});