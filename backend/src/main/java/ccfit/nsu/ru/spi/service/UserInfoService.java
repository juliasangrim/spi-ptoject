package ccfit.nsu.ru.spi.service;

import ccfit.nsu.ru.spi.model.dto.response.UserInfoResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public interface UserInfoService {

    UserInfoResponse getUser(UsernamePasswordAuthenticationToken token);

}